async function moderateNickname(member) {
  let colors = [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Indigo",
    "Violet",
    "Purple",
    "Brown",
    "White",
    "Amethyst",
  ];

  let wordList = [
    "Speakers",
    "House",
    "Computer",
    "Credit card",
    "Clock",
    "Book",
    "Drill press",
    "Flowers",
    "Fridge",
    "Chocolate",
    "Soy sauce packet",
    "Keyboard",
    "Sailboat",
    "Piano",
    "Clamp",
    "Fake flowers",
    "Bottle cap",
    "Socks",
    "Chair",
    "Remote",
    "Toothpaste",
    "Mirror",
    "Sidewalk",
    "Clothes",
    "Mp3 player",
    "Needle",
    "Sketch pad",
    "Picture frame",
    "Cork",
    "Toilet",
    "Grid paper",
    "Bowl",
    "CD",
    "Fork",
    "Greeting card",
    "Sharpie",
    "Ice cube tray",
    "Scotch tape",
    "Lotion",
    "Clay pot",
    "Camera",
    "Keys",
    "Sofa",
    "Video games",
    "Spoon",
    "Shovel",
    "Truck",
    "Milk",
    "Rubber band",
    "Paper",
    "Rusty nail",
    "Buckle",
    "Hair brush",
    "Nail clippers",
    "Boom box",
    "Perfume",
    "Drawer",
    "Paint brush",
    "Stop sign",
  ];

  let randomColor = colors[Math.round(Math.random() * colors.length)];
  let randomWord = wordList[Math.round(Math.random() * wordList.length)];

  await member.setNickname(`${randomColor} ${randomWord}`);
}



module.exports = {
  moderateNickname: moderateNickname,
};
