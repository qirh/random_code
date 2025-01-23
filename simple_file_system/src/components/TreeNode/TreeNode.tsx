import { FileNode, FolderNode } from 'Types';
import { handleError } from 'Data';
import './TreeNode.css';

interface TreeNodeProps {
    node: FolderNode | FileNode;
    onFileClick: (file: FileNode) => void;
}

const TreeNode = ({ node, onFileClick }: TreeNodeProps) => {
    if (node.type === 'file') {
        return (
            <li className="file-node">
                <a
                    className="file-link"
                    rel="noopener noreferrer"
                    onClick={() => onFileClick(node)}
                >
                    {node.title}
                </a>
            </li>
        );
    } else if (node.type === 'folder') {
        return (
            <li className="folder-node">
                <span>{node.name + '\\'}</span>
                <ul>
                    {Object.entries(node.children).map(([childName, childNode]) => (
                        <TreeNode
                            key={childName}
                            node={childNode}
                            onFileClick={onFileClick}
                        />
                    ))}
                </ul>
            </li>
        );
    } else {
        // Instead of throwing, handle invalid node types gracefully
        handleError(new Error('Invalid node type'));
        return <li>Invalid node</li>;
    }
};

export default TreeNode;
