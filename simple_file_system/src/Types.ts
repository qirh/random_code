export interface FileNode {
    type: 'file';
    id: number;
    title: string;
    name: string;
    sourceLink: string;
    exhibit: string;
}

export interface FolderNode {
    type: 'folder';
    name: string;
    children: { [key: string]: FolderNode | FileNode };
}
