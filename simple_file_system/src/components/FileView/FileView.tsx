import { useState, useEffect } from 'react';
import { FileNode } from 'Types';
import './FileView.css';
import { handleError } from 'Data';

type FileViewProps = {
    fileNode: FileNode;
};

// const TreeNode = ({ node, onFileClick }: TreeNodeProps) => {
const FileView = ({ fileNode }: FileViewProps) => {
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(fileNode.sourceLink);
                const text = await response.text();
                setContent(text);
            } catch (error) {
                handleError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [fileNode]);

    return (
        <div className="file-view">
            <pre>
                <code>{JSON.stringify(fileNode, null, 2)}</code>
            </pre>

            {isLoading && <div>File is loading ...</div>}

            {!isLoading && (
                <iframe
                    className="file-content"
                    srcDoc={content}
                    sandbox="allow-same-origin allow-scripts"
                    title="File content viewer"
                />
            )}
        </div>
    );
}


export default FileView;
