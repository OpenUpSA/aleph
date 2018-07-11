import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

import { Schema, Country, Language, Role, Date, FileSize, Entity } from 'src/components/common';

class DocumentMetadata extends Component {
  render() {
    const {document} = this.props;
    return (
      <ul className='info-sheet'>
        <li>
        <span className="key">
          <FormattedMessage id="document.type" defaultMessage="Type"/>
        </span>
        <span className="value">
          <Schema.Label schema={document.schema} icon={true}/>
        </span>
        </li>
        {document.file_name && (
          <li>
            <span className="key">
              <FormattedMessage id="document.file_name" defaultMessage="File name"/>
            </span>
            <span className="value">{document.file_name}</span>
          </li>
        )}
        {document.file_size && (
          <li>
            <span className="key">
              <FormattedMessage id="document.file_size" defaultMessage="File size"/>
            </span>
            <span className="value">
              <FileSize value={document.file_size}/>
            </span>
          </li>
        )}
        {document.parent && (
          <li>
            <span className="key">
              <FormattedMessage id="document.parent" defaultMessage="Folder"/>
            </span>
            <span className="value">
              <Entity.Link icon entity={document.parent} />
            </span>
          </li>
        )}
        {document.generator && (
          <li>
            <span className="key">
              <FormattedMessage id="document.generator" defaultMessage="Generator"/>
            </span>
            <span className="value">{document.generator}</span>
          </li>
        )}
        {document.languages && document.languages.length > 0 && (
          <li>
            <span className="key">
              <FormattedMessage id="document.languages" defaultMessage="Languages"/>
            </span>
            <span className="value">
              <Language.List codes={document.languages}/>
            </span>
          </li>
        )}
        {document.countries && document.countries.length > 0 && (
          <li>
            <span className="key">
              <FormattedMessage id="document.countries" defaultMessage="Countries"/>
            </span>
            <span className="value">
              <Country.List codes={document.countries}/>
            </span>
          </li>
        )}
        {document.date && (
          <li>
            <span className="key">
              <FormattedMessage id="document.date" defaultMessage="Date"/>
            </span>
            <span className="value">
              <Date value={document.date}/>
            </span>
          </li>
        )}
        {document.authored_at && (
          <li>
            <span className="key">
              <FormattedMessage id="document.authored_at" defaultMessage="Authored"/>
            </span>
            <span className="value">
              <Date value={document.authored_at}/>
            </span>
          </li>
        )}
        {document.modified_at && (
          <li>
            <span className="key">
              <FormattedMessage id="document.modified_at" defaultMessage="Modified"/>
            </span>
            <span className="value">
              <Date value={document.modified_at}/>
          </span>
          </li>
        )}
        {document.retrieved_at && (
          <li>
            <span className="key">
              <FormattedMessage id="document.retrieved_at" defaultMessage="Retrieved"/>
            </span>
            <span className="value">
              <Date value={document.retrieved_at}/>
            </span>
          </li>
        )}
        {document.updated_at && (
          <li>
            <span className="key">
              <FormattedMessage id="document.updated_at" defaultMessage="Imported"/>
            </span>
            <span className="value">
              <Date value={document.updated_at}/>
            </span>
          </li>
        )}
        {document.uploader && (
          <li>
            <span className="key">
              <FormattedMessage id="document.uploader" defaultMessage="Uploader"/>
            </span>
            <span className="value">
              <Role.Label role={document.uploader} />
            </span>
          </li>
        )}
        {document.mime_type && (
          <li>
            <span className="key">
              <FormattedMessage id="document.mime_type" defaultMessage="MIME"/>
            </span>
            <span className="value">{document.mime_type}</span>
          </li>
        )}
      </ul>
    );
  }
}

export default DocumentMetadata;
