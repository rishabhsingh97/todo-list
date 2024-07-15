interface IconsProps {
    icon: string;
    size: string;
}

const Icons = ({ icon, size = "1rem" }: IconsProps) => {
    const icons: any = {
        user: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
                <path stroke="currentColor" strokeWidth="1.25" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
            </svg>
        ),
        eyeOpen: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width={size} height={size}><rect width="256" height="256" fill="none" />
                <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" d="M128,55.99219C48,55.99219,16,128,16,128s32,71.99219,112,71.99219S240,128,240,128,208,55.99219,128,55.99219Z" />
                <circle cx="128" cy="128" r="32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
            </svg>
        ),
        eyeClosed: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" width={size} height={size}><rect width="256" height="256" fill="none" />
                <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" d="M128,55.99219C48,55.99219,16,128,16,128s32,71.99219,112,71.99219S240,128,240,128,208,55.99219,128,55.99219Z" />
                <circle cx="128" cy="128" r="32" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
            </svg>
        ),
        order: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width={size} height={size}><path fill="#010101" d="M169.6 377.6c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6s41.601-18.718 41.601-41.6c-.001-22.884-18.72-41.601-41.601-41.601zM48 51.2v41.6h41.6l74.883 151.682-31.308 50.954c-3.118 5.2-5.2 12.482-5.2 19.765 0 27.85 19.025 41.6 44.825 41.6H416v-40H177.893c-3.118 0-5.2-2.082-5.2-5.2 0-1.036 2.207-5.2 2.207-5.2l20.782-32.8h154.954c15.601 0 29.128-8.317 36.4-21.836l74.882-128.8c1.237-2.461 2.082-6.246 2.082-10.399 0-11.446-9.364-19.765-20.8-19.765H135.364L115.6 51.2H48zm326.399 326.4c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6S416 442.082 416 419.2c0-22.883-18.719-41.6-41.601-41.6z" /></svg>
        ),
        menu: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m8.5 8.5h6m-6 3h6m-6 3h6m-8-11h10c1.6568542 0 3 1.34314575 3 3v10c0 1.6568542-1.3431458 3-3 3h-10c-1.65685425 0-3-1.3431458-3-3v-10c0-1.65685425 1.34314575-3 3-3z" /></svg>
        )

    };

    return (
        <div>
            {icons[icon]}
        </div>
    );
};

export default Icons;