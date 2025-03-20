function generateStarTriangle(rows, character = "*", isInverted = false, isAlignedRight = false) {
    // Input validation
    if (!Number.isInteger(rows) || rows <= 0) {
      return "Please provide a positive integer for rows";
    }
    
    if (!character || typeof character !== 'string') {
      character = "*";
    }
    
    let result = [];
    
    // Determine the range based on whether the triangle is inverted
    const startRow = isInverted ? rows : 1;
    const endRow = isInverted ? 1 : rows;
    const step = isInverted ? -1 : 1;
    
    // Generate the triangle pattern
    for (let i = startRow; isInverted ? i >= endRow : i <= endRow; i += step) {
      // Calculate the number of characters and spaces for each row
      const chars = i;
      const spaces = rows - i;
      
      // Create the line based on alignment
      let line;
      if (isAlignedRight) {
        line = " ".repeat(spaces) + character.repeat(chars);
      } else {
        line = character.repeat(chars);
      }
      
      result.push(line);
    }
    
    // Join all rows with newlines
    return result.join("\n");
  }

  console.log(generateStarTriangle(5));