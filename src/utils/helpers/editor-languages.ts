import {javascript} from "@codemirror/lang-javascript";
import {css} from "@codemirror/lang-css";
import {json} from "@codemirror/lang-json";
import {markdown} from "@codemirror/lang-markdown";
import {html} from "@codemirror/lang-html";
import {php} from "@codemirror/lang-php";
import {python} from "@codemirror/lang-python";
import {vue} from "@codemirror/lang-vue";
import {xml} from "@codemirror/lang-xml";
import {yaml} from "@codemirror/lang-yaml";

export const getLanguagePackage = (extension: string) => {
  switch (extension) {
    case "js": return javascript;
    case "ts": return javascript.bind(this, [{typescript: true}]);
    case "jsx": return javascript.bind(this, [{jsx: true}]);
    case "tsx": return javascript.bind(this, [{jsx: true, typescript: true}]);
    case "css":
    case "scss":
    case "sass": {
      return css;
    }
    case "json": return json;
    case "html": return html;
    case "php": return php;
    case "vue": return vue;
    default: return markdown;
  }
}
