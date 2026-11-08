export function generateRepairId(existingIds: string[]): string {
  const year = new Date().getFullYear();
  const prefix = `RF-${year}-`;
  let maxNum = 0;
  existingIds.forEach(id => {
    if (id.startsWith(prefix)) {
      const num = parseInt(id.replace(prefix, ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  return `${prefix}${String(maxNum + 1).padStart(4, '0')}`;
}
