
function convertJsonToHtml(json) {

    let bookmarkHTML = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n' +
        '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
        '<TITLE>Bookmarks</TITLE>\n' +
        '<H1>Bookmarks</H1>\n<DL><p>\n';
    for (let node of json) {
        bookmarkHTML += createHTML(node);
    }
    bookmarkHTML += '</DL><p>\n';

    downloadFile(bookmarkHTML);
}

function downloadFile(data) {
    const element = document.createElement('a');
    const file = new Blob([data], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = 'bookmarks.html';
    element.click();
}

function createHTML(node) {
    if (!node.url) {
        let folderHTML = '<DT><H3>' + node.name + '</H3>\n<DL><p>\n';
        if (node.children) {
            for (let child of node.children) {
                folderHTML += createHTML(child);
            }
        }
        folderHTML += '</DL><p>\n';
        return folderHTML;
    } else {
        return '<DT><A HREF="' + node.url + '">' + node.name + '</A>\n';
    }
}

//Incluir o json completo do arquivo bookmarks recuperado copiar tudo e executar no console do navegador.
const json = {};

convertJsonToHtml(json.roots.bookmark_bar.children);