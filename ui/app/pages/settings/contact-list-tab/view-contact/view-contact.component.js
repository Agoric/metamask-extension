import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Identicon from '../../../../components/ui/identicon'
import { CONTACT_LIST_ROUTE, CONTACT_EDIT_ROUTE } from '../../../../helpers/constants/routes'
import Button from '../../../../components/ui/button/button.component'
import copyToClipboard from 'copy-to-clipboard'

function quadSplit (address) {
  return '0x' + address.slice(2).match(/.{1,4}/g).join(' ')
}

export default class ViewContact extends PureComponent {

  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    removeFromAddressBook: PropTypes.func,
    name: PropTypes.string,
    address: PropTypes.string,
    history: PropTypes.object,
    checkSummedAddress: PropTypes.string,
  }

   render () {
    const { t } = this.context
    const { removeFromAddressBook, history, name, address, checkSummedAddress } = this.props

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <div className="settings-page__header address-book__header">
            <Identicon address={address} diameter={60} />
            <div className="settings-page__button-group">
            <Button
              type="link"
              className="settings-page__address-book-button"
              onClick={() => {
                history.push(`${CONTACT_EDIT_ROUTE}/${address}`)
              }}
            >
              {t('edit')}
            </Button>
            <Button
              type="link"
              className="settings-page__address-book-button"
              onClick={() => {
                removeFromAddressBook(address)
                history.push(CONTACT_LIST_ROUTE)
              }}
            >
              {t('remove')}
            </Button>
            </div>
          </div>
          <div className="address-book__view-contact__group">
            <div className="address-book__view-contact__group__label">
              { t('userName') }
            </div>
            <div className="address-book__view-contact__group__value">
              { name }
            </div>
          </div>
          <div className="address-book__view-contact__group">
            <div className="address-book__view-contact__group__label">
              { t('ethereumPublicAddress') }
            </div>
            <div className="address-book__view-contact__group__value">
              <div
                className="address-book__view-contact__group__static-address"
              >
                { quadSplit(checkSummedAddress) }
              </div>
              <img
                className="address-book__view-contact__group__static-address--copy-icon"
                onClick={() => copyToClipboard(checkSummedAddress)}
                src="/images/copy-to-clipboard.svg"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
