import useProjectMetadata from "../hooks/juicebox/ProjectMetadata";


export interface Props {
    projectId: string;
    handle: string;
    metadataUri: string;
    version: number;
    style?: string;
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ResolvedProject({ version, projectId, handle, metadataUri, style }: Props) {
    // state
    const { data, loading, error } = useProjectMetadata(metadataUri);

    if (loading || error) {
        return null
    }
      
    return (
        <>
            {data?.logoUri && (
                <img
                    className="h-6 w-6 rounded-full inline mx-1"
                    src={data?.logoUri}
                    alt=""
                />
            )}
            {!data?.logoUri && (
                <div className="h-6 w-6 rounded-full inline mx-1">
                    🧃
                </div>
            )}
            
            <a target="_blank" rel="noopener noreferrer"
                className={classNames(
                    "text-xs text-gray-500 text-ellipsis",
                    style,
                )}
                href={
                    version == 1 ? `https://juicebox.money/p/${handle}` 
                        : `https://juicebox.money/${handle ? `@${handle}` 
                        : `v2/p/${projectId}`}`
                }>
                <p className="max-w-[160px] md:max-w-xs inline-block hover:underline">{data?.name}</p> 
            </a>
        </>
    )
}