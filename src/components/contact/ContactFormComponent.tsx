import React from 'react';

const Form = ({ formik }: any) => {
    return (
        <form action="" className={'grid grid-cols-1  form-group my-10 px-2'} onSubmit={formik.handleSubmit}>
            <input
                type="text"
                placeholder={'Nombre'}
                id="name"
                className={formik.touched.name && formik.errors.name ? 'form-control is-invalid' : 'form-control my-2'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.name}</p>
                </div>
            ) : null}
            <input
                type="email"
                placeholder={'Tu correo Electrónico'}
                id="email"
                className={
                    formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control my-2'
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.email}</p>
                </div>
            ) : null}
            <input
                type="text"
                id="issue"
                placeholder={'Asunto'}
                className={
                    formik.touched.issue && formik.errors.issue ? 'form-control is-invalid' : 'form-control my-2'
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.issue}
            />
            {formik.touched.issue && formik.errors.issue ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.issue}</p>
                </div>
            ) : null}
            <textarea
                placeholder={'Mensaje'}
                id={'message'}
                className={
                    formik.touched.message && formik.errors.message ? 'form-control is-invalid' : 'form-control my-2'
                }
                rows={6}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.message}</p>
                </div>
            ) : null}
            <input
                type="submit"
                className={formik.errors ? 'btn btn-black mx-auto my-2' : 'btn btn-black md:mx-auto '}
                value={'Enviar'}
            />
        </form>
    );
};
export default Form;
