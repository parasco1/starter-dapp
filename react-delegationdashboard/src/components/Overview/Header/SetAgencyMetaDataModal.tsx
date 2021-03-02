import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDelegation } from 'helpers';
import { ErrorMessage, Formik } from 'formik';
import { object, string } from 'yup';
import { useContext } from 'context';
import { AgencyMetadata } from 'helpers/types';

const SetAgencyMetaDataModal = () => {
  const { delegation } = useDelegation();
  const { agencyMetaData } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const handleReDelegationCapActivation = (values: AgencyMetadata) => {
    const hexName = Buffer.from(values.name).toString('hex');
    const hexWeb = Buffer.from(values.website).toString('hex');
    const hexKeyBase = Buffer.from(values.keybase).toString('hex');
    const data = hexName + '@' + hexWeb + '@' + hexKeyBase;
    delegation.sendTransaction('0', 'setMetaData', data).then();
  };

  return (
    <>
      <button
        onClick={() => {
          setShowDelegateModal(true);
        }}
        className="btn btn-primary btn-sm"
      >
        Identity
      </button>
      <Modal
        show={showDelegateModal}
        onHide={() => setShowDelegateModal(false)}
        className="modal-container"
        animation={false}
        centered
      >
        <div className="card">
          <div className="card-body p-spacer text-center">
            <p className="h6 mb-spacer" data-testid="metaDataTitle">
              Agency Details
            </p>
            <p className="mb-spacer">
              Update or set your agency details in order to validate your identity.
            </p>
            <Formik
              initialValues={agencyMetaData}
              onSubmit={values => {
                handleReDelegationCapActivation(values);
              }}
              validationSchema={object().shape({
                website: string()
                  .required('Required')
                  .test('URL', 'URL is not valid!', value => {
                    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                    var regex = new RegExp(expression);
                    if (value?.match(regex)) {
                      return true;
                    } else {
                      return false;
                    }
                  }),
              })}
            >
              {props => {
                const { handleSubmit, values, handleBlur, handleChange, errors, touched } = props;

                return (
                  <form onSubmit={handleSubmit} className="text-left">
                    <div className="form-group mb-spacer">
                      <label htmlFor="name">Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name && touched.name ? 'is-invalid' : ''
                          }`}
                          id="name"
                          name="name"
                          data-testid="name"
                          required={true}
                          value={values.name}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage component="div" name="name" className="invalid-feedback" />
                      </div>
                      <label htmlFor="website">Website</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.website && touched.website ? 'is-invalid' : ''
                          }`}
                          id="website"
                          name="website"
                          data-testid="website"
                          required={true}
                          value={values.website}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage component="div" name="website" className="invalid-feedback" />
                      </div>
                      <label htmlFor="website">Keybase</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.keybase && touched.keybase ? 'is-invalid' : ''
                          }`}
                          id="keybase"
                          name="keybase"
                          data-testid="keybase"
                          required={true}
                          value={values.keybase}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage component="div" name="keybase" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                      <button
                        type="submit"
                        className="btn btn-primary mx-2"
                        id="saveMetaData"
                        data-testid="saveMetaData"
                      >
                        Save
                      </button>
                      <button
                        id="closeButton"
                        className="btn btn-link mx-2"
                        onClick={() => setShowDelegateModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SetAgencyMetaDataModal;
