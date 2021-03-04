import React from 'react';

function AccountChangePasswordForm({ formik }: any) {
    return (
        <form className="col-12 col-lg-7 col-xl-6" onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="password-new">Nueva Contraseña</label>
                <input
                    type="password"
                    id="password-new"
                    placeholder="Ingresa la nueva contraseña"
                    name={'password'}
                    className={
                        formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control '
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
            </div>
            {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.password}</p>
                </div>
            ) : null}
            <div className="form-group">
                <label htmlFor="password-confirm">Confirmar la contraseña</label>
                <input
                    type="password"
                    id="password-confirm"
                    placeholder="Ingresa nuevamente la contraseña"
                    name={'password_confirmation'}
                    className={
                        formik.touched.password_confirmation && formik.errors.password_confirmation
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password_confirmation}
                />
            </div>
            {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.password_confirmation}</p>
                </div>
            ) : null}
            <div className="form-group mt-5 mb-0">
                <input type="submit" className="btn btn-primary" value={'Cambiar'} />
            </div>
        </form>
    );
}

export default AccountChangePasswordForm;
