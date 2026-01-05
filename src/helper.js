export function checkHeadingStarts(str){
  return /^(\*)(\*)(.+)\*$/.test(str)
}

export function replaceHeadingStarts(str){
  return str.replace(/^(\*)(\*)|(\*)$/g,'')
}
