export default function calculateUnRead(isReadArray) {
  const countUnRead = [];
  
  for (const item of isReadArray) {
    let totalUnread = 0;
    for (const innerItem of item) {
      if (innerItem === false) {
        totalUnread++;
      }
    }
    countUnRead.push(totalUnread);
    
  }
  return countUnRead;
}
