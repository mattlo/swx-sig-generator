<?php
/*! Release Manager; Output can be used on any confluence page */

// global variables for build execution
class exec {
	const HTML_FOLDER_PATH = '../src/';
	const HTML_FILE_NAME = 'page.html';
	const ASSET_FOLDER_PATH = self::HTML_FOLDER_PATH;
	const JS_FILE_NAME = 'swx-sig-generator.js';
	const CSS_FILE_NAME = 'global.css';
	const OUTPUT_FOLDER_PATH = './';
	const OUTPUT_FILE_NAME = 'swx-sig-generator.html';
}

try {
	// get files
	$page = getFileContents(exec::HTML_FOLDER_PATH . exec::HTML_FILE_NAME);
	$js = getFileContents(exec::ASSET_FOLDER_PATH . exec::JS_FILE_NAME);
	$css = getFileContents(exec::ASSET_FOLDER_PATH . exec::CSS_FILE_NAME);
	
	// replace tpl tags with actual correct file
	$page = str_replace('${js_output}', '<script type="text/javascript">' . $js . '</script>', $page);
	$page = str_replace('${css_output}', '<style text="text/css">' . $css . '</style>', $page);
	
	// output file
	$newfilePath = exec::OUTPUT_FOLDER_PATH . exec::OUTPUT_FILE_NAME;
	$newfile = fopen($newfilePath, 'w');
	fwrite($newfile, $page);
	fclose($newfile);
	
	// test by outputting the new file
	echo getFileContents($newfilePath);
} catch (Exception $e) {
	echo '<pre>';
	print_r($e);
	echo '</pre>';
}

/**
 * Get file as string
 * 
 * @param string $pathToFile
 * @return string
 */
function getFileContents($pathToFile) {
	$file = $pathToFile;
	$handle = fopen($file, "r");
	$pageContents = fread($handle, filesize($file));
	fclose($handle);
	return $pageContents;
}
?>
