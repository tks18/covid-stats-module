module.exports = (tweetArray) => {
  let correctArray = [];
  if (Array.isArray(tweetArray)) {
    correctArray = tweetArray;
  } else {
    correctArray = [tweetArray];
  }
  newArray = correctArray.map((tweet) => {
    return {
      text: tweet,
    };
  });
  return newArray;
};
