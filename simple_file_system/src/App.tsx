import { useState, useEffect } from 'react';
import FileView from 'components/FileView/FileView';
import { directoryData, handleError } from 'Data';
import TreeNode from 'components/TreeNode/TreeNode';
import { FileNode, FolderNode } from 'Types';

const App = () => {
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
    const [treeData, setTreeData] = useState<{ [key: string]: FolderNode | FileNode }>({});
    const [isLoading, setIsLoading] = useState(true);

    const navigateToHome = () => {
        handleFileClick();
    }

    const handleFileClick = (file: FileNode | null = null) => {
        setSelectedFile(file);
    }

    useEffect(() => {
        const initializeTreeData = async () => {
            try {
                setIsLoading(true);
                setTreeData(directoryData);
            } catch (error) {
                handleError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeTreeData();
    }, []);


    const treeContent = isLoading ? (
        <div>Loading tree structure...</div>
    ) : (
        <ul className="tree-view">
            {Object.entries(treeData).map(([name, node]) => (
                <TreeNode
                    key={name}
                    node={node}
                    onFileClick={handleFileClick}
                />
            ))}
        </ul>
    );

    return (
        <>
            <div>
                <nav>
                    <button onClick={() => navigateToHome()}>Home</button>
                </nav>
            </div>
            {!selectedFile && treeContent}
            {selectedFile && <FileView fileNode={selectedFile} />}
        </>
    );
};

export default App;
