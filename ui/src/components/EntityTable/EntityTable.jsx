import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { defineMessages, injectIntl } from 'react-intl';
import c from 'classnames';

import EntityTableRow from './EntityTableRow';
import { SortableTH, ErrorSection } from 'src/components/common';

import './EntityTable.css';


const messages = defineMessages({
  column_name: {
    id: 'entity.column.name',
    defaultMessage: 'Name',
  },
  column_collection_id: {
    id: 'entity.column.collection_id',
    defaultMessage: 'Source',
  },
  column_schema: {
    id: 'entity.column.schema',
    defaultMessage: 'Type',
  },
  column_file_size: {
    id: 'entity.column.file_size',
    defaultMessage: 'Size',
  },
});

class EntityTable extends Component {

  constructor(props) {
    super(props);
    this.state = {result: props.result};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { result } = nextProps;
    return (result.total !== undefined || result.isError) ? { result } : null;
  }

  sortColumn(field) {
    const { query, updateQuery } = this.props;
    const { field: sortedField, desc } = query.getSort();
    // Toggle through sorting states: ascending, descending, or unsorted.
    let newQuery;
    if (sortedField !== field) {
      newQuery = query.sortBy(field, false);
    } else {
      if (!desc) {
        newQuery = query.sortBy(field, true);
      } else {
        newQuery = query.sortBy(null);
      }
    }
    updateQuery(newQuery);
  }

  render() {
    const { query, intl, location, history } = this.props;
    const { hideCollection = false, documentMode = false } = this.props;
    const isLoading = this.props.result.total === undefined;
    const { result } = this.state;

    if (result.isError) {
      return <ErrorSection error={result.error} />;
    }

    if (result.total === 0 && result.page === 1) {
      return null;
    }

    const TH = ({ sortable, field, ...otherProps }) => {
      const { field: sortedField, desc } = query.getSort();
      return (
        <SortableTH sortable={sortable}
                    sorted={sortedField === field && (desc ? 'desc' : 'asc')}
                    onClick={() => this.sortColumn(field)}
                    {...otherProps}>
          {intl.formatMessage(messages[`column_${field}`])}
        </SortableTH>
      );
    };

    return (
      <table className="EntityTable data-table">
        <thead>
          <tr>
            <TH field="name" className="wide" sortable={true} />
            {!hideCollection &&
              <TH field="collection_id" />
            }
          </tr>
        </thead>
        <tbody className={c({'updating': isLoading})}>
          {result.results !== undefined && result.results.map(entity =>
            <EntityTableRow key={entity.id}
                            entity={entity}
                            hideCollection={hideCollection}
                            documentMode={documentMode}
                            location={location}
                            history={history} />
          )}
        </tbody>
      </table>
    );
  }
}

EntityTable = injectIntl(EntityTable);
EntityTable = withRouter(EntityTable);
export default EntityTable;
