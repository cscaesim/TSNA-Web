// import {Route, Link} from 'react-router-dom'

const Link = ReactRouterDOM.Link
const Route = ReactRouterDOM.Route

'use strict'
let url = 'https://api.spaceflightnewsapi.net/v3'
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            articles: [],
            blogs: [],
            reports: []
        }
    }

    componentDidMount() {
        Promise.all([
            fetch(`${url}/articles?_limit=50`),
            fetch(`${url}/blogs?_limit=50`),
            fetch(`${url}/reports?_limit=50`)
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) =>  this.setState({
            articles: data1,
            blogs: data2,
            reports: data3
        }))
    }

    render() {
        return (
            <div className="position-fixed position-trbl-0">

            <nav className="navbar bg-dark">
                    <div className="container-fluid">
                        
                        <a className="navbar-brand" href="#">
                        <img id="tabbar-image" src="https://raw.githubusercontent.com/cscaesim/Pictures/master/SpaceIcon.PNG?token=AEDENNBXT2DYEP5HWYI2J6LA3EOZ2"></img>
                        TSNA
                        </a>
                    </div>
                </nav>

            <div className="body overflow-hidden container-fluid position-relative h-100 position-trbl-0">
                <div className="row">
                    <div className="col" id="left">
                        <Articles title="Articles" data={this.state.articles} />
                    </div>

                    <div className="col" id="middle">
                        <Articles title="Blogs" data={this.state.blogs} />
                    </div>

                    <div className="col" id="right">
                        <Articles title="Reports" data={this.state.reports} />
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const Articles = ({ title, data }) => {
    return (
        <div className="article-col">
            <center>
                <h1>{title}</h1>
                {data.map((article) => (
                    <div className="card">
                        <div className="card-body">
                        
                            <a href={article.url} target="_blank">
                                <h5 className="card-title">
                                    {article.title}
                                </h5> 
                            </a>
                            
                            <h6 className="card-subtitle mb-2 text-muted">{article.newsSite}</h6>
                            <p className="card-text">{article.summary}</p>
                        </div>
                    </div>
                ))}
            </center>
        </div>
    )
}

let domContainer = document.querySelector('#App')

ReactDOM.render(<App />, domContainer)