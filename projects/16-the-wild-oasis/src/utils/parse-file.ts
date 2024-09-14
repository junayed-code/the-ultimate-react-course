export function parseFile(file: File) {
  const { name, size, type } = file;
  const [base, ext] = name.split('.');
  const randomId = crypto?.randomUUID().split('-').at(-1);
  const randomName = `${base}-${randomId}.${ext}`.toLowerCase();
  return { name, base, size, type, randomName, ext: '.' + ext };
}
