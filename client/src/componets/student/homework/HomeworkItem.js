import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getHomeworkBy_id, submitHomework, removeHomework } from '../../../actions/student/homework'
import { Fragment } from 'react'
import Spinner from '../../layouts/Spinner'
import Moment from 'react-moment'
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

function HomeworkItem({ getHomeworkBy_id, submitHomework, removeHomework, studentHomework: { homework, loading

}, match, history
}) {
    useEffect(() => {
        getHomeworkBy_id(match.params.id)
    }, [getHomeworkBy_id, match.params.id])





    // file upload logics
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Attach File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const formData = new FormData();
    formData.append('file', file);
    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };



    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            //   extracting the id from url
            const id = match.params.id
            const res = await axios.post(`/api/student/complete/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            const { attachements, filename } = res.data;

            setUploadedFile({ attachements, filename });

            setMessage('File Uploaded');

        } catch (err) {
            if (err.response.status === 500) {
                setMessage('No File Uploaded');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    };



    return (
        <Fragment>
            {homework && loading === null ? <Spinner /> : <Fragment>
                <div className="py-2">
                    <div className="card bg-secondary">
                        <div className="card-header ">
                            <h4>Homework details</h4>
                        </div>
                        {/*  */}
                        <div className="card-header">
                            <label className="floating-label"> <strong>Title</strong> </label>
                            <h5 className="card-title">{homework && homework.title}</h5>

                        </div>
                        {/*  */}
                        {/* Dates */}
                        <div className="ml-4">
                            <div className=" mb-1 ">
                                <strong>Issued</strong>:<Moment format='YYYY/MM/DD' >{homework && homework.set_date}</Moment>
                            </div>
                            <div className=" mb-1">
                                <strong>Due</strong>: <Moment format='YYYY/MM/DD' >{homework && homework.due_date}</Moment>
                            </div>
                            <div className="mb-1">
                                <strong>Effort estimate</strong>:  {homework && homework.effort_time}
                            </div>
                        </div>
                        <div className="card-body ">
                            <label className="floating-label"> <strong>Description</strong> </label>
                            <p>{homework && homework.description}</p>
                            <button type="button" className="btn  btn-secondary">View
            Attachments</button>
                        </div>
                        <div className="card-footer">
                            {message ? <Message msg={message} /> : null}
                            <Progress percentage={uploadPercentage} />
                            <form onSubmit={onSubmit} action="upload/:id" method="POST" enctype="multipart/form-data" >

                                <div className="form-group col-md-8 ">

                                    <label htmlFor="file" className="col-form-label">
                                        {filename}
                                    </label>
                                    <input className="form-control" type="file" onChange={onChange} name="file" id="file" />
                                    <input
                                        type='submit'
                                        value='Upload'
                                        className='btn btn-primary mt-4'
                                    />
                                </div>

                                {/* displaying the forms */}
                                {uploadedFile ? (
                                    <div className='row mt-5'>
                                        <div className='col-md-6 m-auto'>
                                            <h3 className='text-center'>{uploadedFile.filename}</h3>
                                            <img style={{ width: '100%' }} src={uploadedFile.attachements} alt='' />

                                        </div>
                                    </div>
                                ) : null}


                            </form>

                        </div>

                        <div className="col-sm-6 py-3">
                            <button onClick={() => submitHomework(homework._id, formData, history, removeHomework(homework._id))} type="submit" className="btn btn-success mr-2">Submit Homework</button>
                            <Link to="/student-dashboard" className="btn btn-secondary">Go back</Link>
                        </div>
                    </div>
                </div>

            </Fragment>}
        </Fragment>


    )
}

HomeworkItem.propTypes = {
    getHomeworkBy_id: PropTypes.func.isRequired,
    studentHomework: PropTypes.object.isRequired,
    submitHomework: PropTypes.func.isRequired,
    removeHomework: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    studentHomework: state.studentHomework
})

export default connect(mapStateToProps, { getHomeworkBy_id, removeHomework, submitHomework })(withRouter(HomeworkItem))
