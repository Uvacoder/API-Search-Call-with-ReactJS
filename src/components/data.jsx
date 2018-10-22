import React, {Component} from 'react';
import axios from 'axios';
import Preview from './preview.jsx';

export default class LikeGoogle extends Component {
    constructor() {
        super();
        this.state = {
            searchKey: 'react',
            searchTerm: 'react',
            results: [],
            error: ''
        }
        this.url = 'https://hn.algolia.com/api/v1/search?query=';
    }

    fetchStories = value => {
        const results = this.state.results.slice(0);
        if (value) {
            if (!results.some(val => val[value])) {
                axios(`${this.url}${value}`)
                .then(getResp => {
                    results.push({
                        [value]: getResp.data,
                    });
                    this.setState({results});
                })
                .catch(error => {this.setState({error})})
            }
        }
    }
    
    componentDidMount() {
        const {searchKey} = this.state;
        this.fetchStories(searchKey);
    }
    
    getValue = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onSearchHandler = () => {
        const {searchTerm} = this.state;
        this.setState({
            searchKey: searchTerm
        });
        this.fetchStories(searchTerm);
    }
    
    render() {
        const {searchTerm, searchKey, results} = this.state;
        const getResult = results.find(val => val[searchKey]);
        console.log(results);
        return(
            <div className='container'>
                <table className='form-group'>
                    <tbody>
                        <tr>
                            <td>
                                <input 
                                    type='text'
                                    name='searchTerm' value={searchTerm}
                                    className='form-control'
                                    onChange={this.getValue} />
                            </td>
                            <td>
                                <input
                                    type='button' value='Search'
                                    className='btn btn-primary'
                                    onClick={this.onSearchHandler} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {getResult &&
                    <Preview
                        data={getResult} search={searchKey} />    
                }
            </div>
        );
    }
}