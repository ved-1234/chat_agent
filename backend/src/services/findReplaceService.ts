// Simple text replacement logic
export async function runFindReplace(content, findText, replaceText) {
  // Replace all occurrences of `findText` with `replaceText`
  const regex = new RegExp(findText, "gi"); 
  return content.replace(regex, replaceText);
}
