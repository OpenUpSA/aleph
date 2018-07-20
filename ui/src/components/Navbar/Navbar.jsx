import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';
import queryString from 'query-string';
import { ControlGroup, InputGroup } from "@blueprintjs/core";
// import {ControlGroup, InputGroup, NavbarDivider} from "@blueprintjs/core";

import SearchAlert from 'src/components/SearchAlert/SearchAlert';
import AuthButtons from 'src/components/AuthButtons/AuthButtons';

import './Navbar.css';

const messages = defineMessages({
  search_placeholder: {
    id: 'navbar.search_placeholder',
    defaultMessage: 'Search companies, people and documents.',
  }
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchValue: ''};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { query } = this.props;
    if (query !== undefined) {
      this.setState({searchValue: query.getString('q')})
    }
  }

  onChange({target}) {
    this.setState({searchValue: target.value});
  }

  onSubmit(event) {
    const { query, updateQuery, history } = this.props;
    event.preventDefault();
    if (updateQuery !== undefined) {
      updateQuery(query.set('q', this.state.searchValue));
    } else {
      history.push({
        pathname: '/search',
        search: queryString.stringify({
          q: this.state.searchValue
        })
      })
    }
  }

  render() {
    const {metadata, session, intl, isHomepage} = this.props;
    const {searchValue} = this.state;

    return (
      <div id="Navbar" className="Navbar">
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">
              <Link to="/">{metadata.app.title}</Link>
            </div>
            {/*
              {session && session.loggedIn === true && <NavbarDivider/>}
              {session && session.loggedIn === true && <div>
                <Link to="/cases">Cases</Link>
              </div>}
            */}
            {!isHomepage && (
              <form onSubmit={this.onSubmit} className='navbar-search-form'>
                <ControlGroup fill={true}>
                  <InputGroup
                    type="text"
                    leftIcon="search"
                    className="pt-large"
                    onChange={this.onChange} value={searchValue}
                    placeholder={intl.formatMessage(messages.search_placeholder)}
                    rightElement={<SearchAlert queryText={searchValue}/>}
                  />
                </ControlGroup>
              </form>
            )}
          </div>
          <div className="pt-navbar-group pt-align-right">
            <Link to="/sources" className="pt-minimal pt-button pt-icon-database">
              <FormattedMessage id="nav.sources" defaultMessage="Sources"/>
            </Link>
            <div className="pt-navbar-divider"/>
            <AuthButtons session={session} auth={metadata.auth}/>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { session: state.session };
};

Navbar = connect(mapStateToProps, {})(Navbar);
Navbar = injectIntl(Navbar);
Navbar = withRouter(Navbar);
export default Navbar;
