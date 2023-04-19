// 本地图片转换为模版能使用的路径
export const getImagePath = (imageUrl) => {
    return new URL(`../assets/${imageUrl}`, import.meta.url).href;
};

// 根据缓存获取对应页面的壁纸
export const getWallpaper = (pageName) => {
    const wallpapers = JSON.parse(localStorage.getItem("wallpapers")) || [];
    return wallpapers.find((item) => item.name === pageName)?.path;
}