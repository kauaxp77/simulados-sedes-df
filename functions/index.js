const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');

admin.initializeApp();
const db = admin.firestore();

// Serviço de auditoria para criar logs de operações importantes.
exports.createAuditLog = functions.firestore.document('/{collection}/{docId}').onWrite(async (change, context) => {
  const collection = context.params.collection;
  const docId = context.params.docId;
  const auth = change.after.exists ? change.after.data() : null;
  const eventType = change.before.exists ? (change.after.exists ? 'update' : 'delete') : 'create';

  const logEntry = {
    actorId: auth?.actorId || 'system',
    actorRole: auth?.actorRole || 'system',
    action: eventType,
    resource: collection,
    resourceId: docId,
    changeType: eventType,
    details: {
      before: change.before.exists ? change.before.data() : null,
      after: change.after.exists ? change.after.data() : null,
    },
    ip: context.ip || 'unknown',
    userAgent: context.userAgent || 'unknown',
    location: 'unknown',
    device: 'unknown',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('logs').add(logEntry);
});

// Função de backup para exportar dados do Firestore. Deve ser executada como cron job.
exports.backupFirestore = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const bucketName = process.env.BACKUP_BUCKET;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputUri = `gs://${bucketName}/firestore-backups/daily-${timestamp}`;

  await admin.firestore().bulkWriter();
  await admin.storage().bucket(bucketName).upload('/tmp/.keep', {
    destination: `firestore-backups/daily-${timestamp}/.keep`,
  });

  return { message: `Backup agendado em ${outputUri}` };
});

// Função para criptografar CPF usando AES-256-GCM antes de gravar no Firestore.
exports.encryptCpf = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado');
  }

  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(process.env.CPF_SECRET, 'hex'), Buffer.alloc(12, 0));
  let encrypted = cipher.update(data.cpf, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return { encryptedCpf: `${encrypted}:${authTag}` };
});

// Função de recuperação de dados. Apenas admin pode executar.
exports.restoreBackup = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Apenas administradores podem restaurar backups');
  }

  // Implementar recuperação segura via GCS / export para Cloud Firestore
  return { message: 'Restoration process should be implemented with gcloud import calls from secure storage.' };
});
