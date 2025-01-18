import exec from 'ssh-exec';

const host = 'casaos.local';

export const runRemoteCommand = async (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, { host }).pipe(process.stdout, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(data);
      return resolve(data);
    });
  });
};
