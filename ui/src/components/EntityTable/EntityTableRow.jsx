import React, { Component } from 'react';
import queryString from 'query-string';

import { Country, Schema, Collection, Entity, FileSize, Date } from 'src/components/common';


class EntityTableRow extends Component {
  render() {
    const { entity, className, location: loc } = this.props;
    const { hideCollection, documentMode } = this.props;
    const parsedHash = queryString.parse(loc.hash);

    let rowClassName = (className) ? `${className} nowrap` : 'nowrap';

    // Select the current row if the ID of the entity matches the ID of the
    // current object being previewed. We do this so that if a link is shared
    // the currently displayed preview will also have the row it corresponds to
    // highlighted automatically.
    if (parsedHash['preview:id'] && parsedHash['preview:id'] === entity.id) {
      rowClassName += ' active'
    }

    return (
      <tr className={rowClassName}>
        <td className="entity">
          <Entity.Link preview={!documentMode} entity={entity} icon />
        </td>
        {!hideCollection &&
          <td className="collection">
            <Collection.Link preview={true} collection={entity.collection} icon />
          </td>
        }
        <td className="schema">
          <Schema.Label schema={entity.schema} />
        </td>
      </tr>
    );
  }
}

export default EntityTableRow;
