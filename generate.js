function generateStarTriangle(
  rows, 
  character = "*", 
  isInverted = false, 
  isAlignedRight = false,
  isHollow = false,
  isDoubleSided = false,
  border = null,
  fill = " ",
  colorCode = null
) {
  // Input validation
  if (!Number.isInteger(rows) || rows <= 0) {
    return "Please provide a positive integer for rows";
  }
  
  if (!character || typeof character !== 'string') {
    character = "*";
  }

  if (!border) {
    border = character;
  }
  
  const result = [];
  
  // Double-sided triangle (diamond) needs special handling
  if (isDoubleSided) {
    // Generate top half (always non-inverted)
    const topHalf = generateHalf(rows, character, false, isAlignedRight, isHollow, border, fill);
    
    // Generate bottom half (always inverted)
    // Start from second row to avoid duplicating the middle row
    const bottomHalf = generateHalf(rows - 1, character, true, isAlignedRight, isHollow, border, fill);
    
    // Combine both halves
    return applyColor(topHalf.concat(bottomHalf).join("\n"), colorCode);
  }
  
  // Regular triangle
  return applyColor(generateHalf(rows, character, isInverted, isAlignedRight, isHollow, border, fill).join("\n"), colorCode);
  
  // Helper function to generate half of the triangle/diamond
  function generateHalf(rows, character, isInverted, isAlignedRight, isHollow, border, fill) {
    const result = [];
    
    // Determine the range based on whether the triangle is inverted
    const startRow = isInverted ? rows : 1;
    const endRow = isInverted ? 1 : rows;
    const step = isInverted ? -1 : 1;
    
    // Generate the triangle pattern
    for (let i = startRow; isInverted ? i >= endRow : i <= endRow; i += step) {
      // Calculate the number of characters and spaces for each row
      const chars = i;
      const spaces = rows - i;
      
      // Create the line based on alignment and hollow/filled
      let line;
      
      if (isHollow && i > 1 && i < rows) {
        // Hollow triangle row
        if (isAlignedRight) {
          line = " ".repeat(spaces) + border + fill.repeat(chars - 2) + (chars > 1 ? border : "");
        } else {
          line = border + fill.repeat(chars - 2) + (chars > 1 ? border : "");
        }
      } else {
        // Solid triangle row
        if (isAlignedRight) {
          line = " ".repeat(spaces) + character.repeat(chars);
        } else {
          line = character.repeat(chars);
        }
      }
      
      result.push(line);
    }
    
    return result;
  }
  
  // Helper function to apply color to the output
  function applyColor(text, colorCode) {
    if (!colorCode) return text;
    
    // Color codes: 
    // 31=red, 32=green, 33=yellow, 34=blue, 35=magenta, 36=cyan
    const colorMap = {
      'red': '\x1b[31m',
      'green': '\x1b[32m',
      'yellow': '\x1b[33m',
      'blue': '\x1b[34m',
      'magenta': '\x1b[35m',
      'cyan': '\x1b[36m',
      'reset': '\x1b[0m'
    };
    
    const selectedColor = colorMap[colorCode.toLowerCase()] || colorCode;
    return selectedColor + text + colorMap.reset;
  }
}

// Function to generate a random triangle
function generateRandomTriangle() {
  const rows = Math.floor(Math.random() * 10) + 3;
  const characters = ['*', '#', '@', '+', '$', '■', '▲', '★', '♦', '●'];
  const character = characters[Math.floor(Math.random() * characters.length)];
  const isInverted = Math.random() > 0.5;
  const isAlignedRight = Math.random() > 0.5;
  const isHollow = Math.random() > 0.5;
  const isDoubleSided = Math.random() > 0.7;
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return generateStarTriangle(
    rows, 
    character, 
    isInverted, 
    isAlignedRight, 
    isHollow, 
    isDoubleSided, 
    null, 
    " ", 
    color
  );
}

// Function to generate multiple patterns for comparison
function generatePatternGallery(rows = 5, character = "*") {
  const patterns = [
    { name: "Basic Triangle", options: {} },
    { name: "Inverted Triangle", options: { isInverted: true } },
    { name: "Right-Aligned Triangle", options: { isAlignedRight: true } },
    { name: "Hollow Triangle", options: { isHollow: true } },
    { name: "Diamond", options: { isDoubleSided: true } },
    { name: "Hollow Diamond", options: { isDoubleSided: true, isHollow: true } },
    { name: "Colored Triangle", options: { colorCode: "cyan" } },
    { name: "Custom Border", options: { isHollow: true, border: "#", fill: "." } },
  ];
  
  return patterns.map(pattern => {
    return `${pattern.name}:\n${generateStarTriangle(rows, character, 
      pattern.options.isInverted || false,
      pattern.options.isAlignedRight || false,
      pattern.options.isHollow || false,
      pattern.options.isDoubleSided || false,
      pattern.options.border || null,
      pattern.options.fill || " ",
      pattern.options.colorCode || null
    )}\n`;
  }).join("\n");
}

console.log(generateStarTriangle(5));