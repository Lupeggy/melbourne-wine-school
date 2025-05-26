const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const renderWithLayout = (res, template, data = {}) => {
  try {
    // Read the template file first
    const templatePath = path.join(__dirname, `${template}.ejs`);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Read the layout file
    const layoutPath = path.join(__dirname, 'layouts', 'main.ejs');
    if (!fs.existsSync(layoutPath)) {
      throw new Error(`Layout not found: ${layoutPath}`);
    }
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    // Render the template with the provided data
    const renderedContent = ejs.render(templateContent, { ...data, layout: false });
    
    // Combine the layout and rendered content
    const finalHtml = ejs.render(
      layoutContent,
      { 
        ...data,
        body: renderedContent,
        filename: layoutPath
      }
    );
    
    // Send the final HTML
    res.send(finalHtml);
  } catch (error) {
    console.error('Error rendering template:', error);
    res.status(500).send(`Error rendering template: ${error.message}`);
  }
};

module.exports = { renderWithLayout };
