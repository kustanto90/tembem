import Link from 'next/link'
import {listDataFiles} from '../utils/fsUtils'

function Home({links}) {
    return <div>
        <h1>Github Trending Daily. There are {links.length} files.</h1>
        <ul>
            {links.map((file) => (
                <li key={file}>
                    <Link href={`/trending/${encodeURIComponent(file)}`}>
                        <a>{file}</a>
                    </Link>
                    (<a href={`/${encodeURIComponent(file)}.json`}>raw</a>)
                </li>
            ))}
        </ul>
    </div>
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const links = (await listDataFiles()).map(f => f.split('.')[0]).sort((f1, f2) => f1.localeCompare(f2) * -1)
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            links,
        },
    }
}

export default Home
