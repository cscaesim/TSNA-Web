var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {Route, Link} from 'react-router-dom'

var Link = ReactRouterDOM.Link;
var Route = ReactRouterDOM.Route;

'use strict';
var url = 'https://api.spaceflightnewsapi.net/v3';

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            articles: [],
            blogs: [],
            reports: []
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            Promise.all([fetch(url + '/articles?_limit=50'), fetch(url + '/blogs?_limit=50'), fetch(url + '/reports?_limit=50')]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 3),
                    res1 = _ref2[0],
                    res2 = _ref2[1],
                    res3 = _ref2[2];

                return Promise.all([res1.json(), res2.json(), res3.json()]);
            }).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 3),
                    data1 = _ref4[0],
                    data2 = _ref4[1],
                    data3 = _ref4[2];

                return _this2.setState({
                    articles: data1,
                    blogs: data2,
                    reports: data3
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'position-fixed position-trbl-0' },
                React.createElement(
                    'nav',
                    { className: 'navbar bg-dark' },
                    React.createElement(
                        'div',
                        { className: 'container-fluid' },
                        React.createElement(
                            'a',
                            { className: 'navbar-brand', href: 'https://github.com/cscaesim' },
                            React.createElement('img', { id: 'tabbar-image', src: 'https://raw.githubusercontent.com/cscaesim/Pictures/master/SpaceIcon.PNG?token=AEDENNBXT2DYEP5HWYI2J6LA3EOZ2' }),
                            'TSNA'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'body overflow-hidden container-fluid position-relative h-100 position-trbl-0' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col', id: 'left' },
                            React.createElement(Articles, { title: 'Articles', data: this.state.articles })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col', id: 'middle' },
                            React.createElement(Articles, { title: 'Blogs', data: this.state.blogs })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col', id: 'right' },
                            React.createElement(Articles, { title: 'Reports', data: this.state.reports })
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

var Articles = function Articles(_ref5) {
    var title = _ref5.title,
        data = _ref5.data;

    return React.createElement(
        'div',
        { className: 'article-col' },
        React.createElement(
            'center',
            null,
            React.createElement(
                'h1',
                null,
                title
            ),
            data.map(function (article) {
                return React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-body' },
                        React.createElement(
                            'a',
                            { href: article.url, target: '_blank' },
                            React.createElement(
                                'h5',
                                { className: 'card-title' },
                                article.title
                            )
                        ),
                        React.createElement(
                            'h6',
                            { className: 'card-subtitle mb-2 text-muted' },
                            article.newsSite
                        ),
                        React.createElement(
                            'p',
                            { className: 'card-text' },
                            article.summary
                        )
                    )
                );
            })
        )
    );
};

var domContainer = document.querySelector('#App');

ReactDOM.render(React.createElement(App, null), domContainer);