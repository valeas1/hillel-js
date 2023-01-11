import Folder from './components/Folder';
import File from './components/File';

export const FOLDER_TYPE = 'FOLDER';
export const START_PATH = ['/Common7', '/Common7/IDE', '/VC', '/VC/crt'];

export const getComponent = (data, expandedFolders = [], search) => {
    return data.map((item) =>
        item.type === FOLDER_TYPE ? (
            showFolder(search, item.children, expandedFolders) ? (
                <Folder
                    key={JSON.stringify({ ...item, expandedFolders: expandedFolders })}
                    name={item.name}
                    children={item.children}
                    expandedFolders={expandedFolders}
                    search={search}
                ></Folder>
            ) : null
        ) : showFile(search, expandedFolders, item) ? (
            <File key={JSON.stringify({ ...item, expandedFolders: expandedFolders })} name={item.name}></File>
        ) : null
    );
};

export const createDataMap = (data) => {
    let mapArray = [];

    function createPath(data, path = '') {
        data.forEach((item) => {
            if (item.type === FOLDER_TYPE) {
                createPath(item.children, `${path}/${item.name}`);
            } else {
                mapArray.push(`${path}/${item.name}`);
            }
        });
    }
    createPath(data);

    return mapArray;
};

export const path = (arr) => {
    const startPath = START_PATH;
    if (!arr) {
        return startPath;
    }
    let pathItems = [];

    arr.forEach((item) => {
        item.split('/')
            .filter((i) => !!i)
            .reduce((acc, item) => {
                pathItems.push(`/${acc}`, `/${acc}/${item}`);
                return `${acc}/${item}`;
            });
    });
    return Array.from(new Set(pathItems));
};

const showFolder = (search, data, items) => {
    if (!search) return true;

    let show = false;

    let arr = [];

    const fn = (data) => {
        data.forEach((item) => {
            if (item.type === 'FOLDER') {
                fn(item.children);
            } else {
                arr.push(item.name);
            }
        });
    };
    fn(data);

    items.forEach((item) => {
        arr.forEach((f) => {
            if (item.includes(f)) {
                show = true;
            }
        });
    });

    return show;
};

const showFile = (search, path, item) => {
    if (!search) {
        return true;
    } else {
        return path.some((f) => f.includes(item.name));
    }
};
