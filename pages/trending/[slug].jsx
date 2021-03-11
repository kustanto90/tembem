import {listDataFiles, getData} from '../../utils/fsUtils'

function Trending({date, data}) {
    return <div>
        <h1>Github Trending Daily: {date}</h1>

        <div>
            {Object.keys(data).map((cat) => (
                <div key={cat}>
                    <h2>{cat}</h2>
                    <ul>
                        {data[cat].map((item) => (
                            <li key={item.repository}>
                                {cat === 'trending' && item.programmingLanguage ?
                                    <a href={`https://github.com/${item.repository}`}>[{item.programmingLanguage}] {item.repository}</a> :
                                    <a href={`https://github.com/${item.repository}`}>{item.repository}</a>
                                }

                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
}

export async function getStaticProps({params}) {
    const data = await getData(params.slug)
    return {
        props: {
            date: params.slug,
            data
        }
    }
}

export async function getStaticPaths() {
    const files = await listDataFiles()
    const links = files.map(f => {return {params: {slug: f.split('.')[0]}}})
    return {
        paths: links,
        fallback: false
    };
}

export default Trending