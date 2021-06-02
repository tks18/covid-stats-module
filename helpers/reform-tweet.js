module.exports = (tweetArray) => {
  let correctArray = [];
  if (Array.isArray(tweetArray)) {
    correctArray = tweetArray;
  } else {
    correctArray = [tweetArray];
  }
  const newArray = correctArray.map((tweet) => ({
    text: tweet,
  }));
  return newArray;
};
