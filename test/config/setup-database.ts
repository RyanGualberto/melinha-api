import { exec, ExecException } from 'child_process';

const database = 'melinha_test_api';
const databaseUser = 'ryangualberto';
const databasePassword = '044825';
const databaseHost = 'localhost';
const databasePort = '5432';
const databaseUrl = `postgresql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${database}`;

const resetDatabaseTestCommand = `DATABASE_URL="${databaseUrl}" npx prisma migrate dev`;

export const logExec = (error: ExecException) => {
  if (error) {
    console.error(`ERROR RUNNING MIGRATION: ${error.message}`);
    return;
  }

  // if (stderr) {
  //   console.error(`stderr: ${stderr}`);
  //   return;
  // }

  console.log('Database Migrated');
};

export function resetDatabaseTest() {
  exec(resetDatabaseTestCommand, logExec);
}

resetDatabaseTest();
