module.exports = async function (url) {
  try {
    const regex = /(?:https?:\/\/)?(?:www|m\.)?(?:facebook|fb|m|.me\.facebook)\.(?:com|me|watch)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
    const result = url.match(regex);
    return result
  } catch {
    return false
  }
}