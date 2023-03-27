const htmlmin = require("html-minifier");
const cleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function(content) {
    if ( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
	useShortDocType: true,
	removeComments: true,
	collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent) {
      let result = new cleanCSS({}).minify(inputContent).styles;

      return async (data) => {
	return result;
      };
    }
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new cleanCSS({}).minify(code).styles;
  });
};
