import { exec, ExecException } from 'child_process';

const database = 'melinha_test';
const databaseUser = 'ryangualberto';
const databasePassword = '044825';
const databaseHost = 'localhost';
const databasePort = '5432';
const databaseUrl = `postgresql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${database}`;

const resetDatabaseTestCommand = `DATABASE_URL="${databaseUrl}" npx prisma migrate reset --force`;

export const logExec = (
  error: ExecException,
  stdout: string,
  stderr: string,
) => {
  if (error) {
    console.error(`ERROR RUNNING MIGRATION: ${error.message}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
};

export function resetDatabaseTest() {
  exec(resetDatabaseTestCommand, logExec);
}

resetDatabaseTest();
