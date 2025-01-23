import { FileNode, FolderNode } from 'Types';

const handleError = (error: Error) => {
    // add proper error handling: logging, displaying a user friendly error message, etc.
    console.error(error);
    throw error;
}

const fetchFileList = async () => {
    try {
        const jsonPath = 'https://zrw71viyknudgyng.public.blob.vercel-storage.com/documents-stcJc3xBHnkt9rqO6P6ReCsp1Bq0Eh.json';
        const response = await fetch(jsonPath);
        if (!response.ok) {
            handleError(new Error(`HTTP error. status: ${response.status}`));
        }
        return await response.json();
    } catch (error) {
        handleError(error as Error);
    }
}

const directoryData = await (async () => {
    const rootNodes: { [key: string]: FolderNode | FileNode } = {};
    const documents = await fetchFileList();

    for (const document of documents) {
        // folder key must at least have one /. Example: /corporate/amendments or /corporate
        // there is no error handling in case the folder key is not valid.
        const pathParts = document.folder.split('/').filter(Boolean);
        let currentLevel = rootNodes;

        // Create folder structure
        for (let i = 0; i < pathParts.length; i++) {
            const folderName = pathParts[i];
            if (!(folderName in currentLevel)) {
                // if the folder has not been created yet, create it
                currentLevel[folderName] = {
                    type: 'folder',
                    name: folderName,
                    children: {},
                };
            }

            // move down the tree
            const nextLevel = currentLevel[folderName] as FolderNode;
            currentLevel = nextLevel.children;
        }

        // Add the file to the last folder touched
        const fileNode: FileNode = {
            type: 'file',
            id: document.id,
            title: document.title,
            name: document.filename,
            sourceLink: document.sourceLink,
            exhibit: document.exhibit,
        };
        currentLevel[fileNode.name] = fileNode;
    }
    return rootNodes;
})();

export { directoryData, handleError };