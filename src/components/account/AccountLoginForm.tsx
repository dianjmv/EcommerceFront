import Check9x7Svg from '../../svg/check-9x7.svg';
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function AccountLoginForm({ formik, loading }: any) {
    return (
        <form action="" onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                    id="login_email"
                    name="login_email"
                    type="email"
                    placeholder="Ingrese el Email"
                    className={
                        formik.touched.login_email && formik.errors.login_email
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.login_email}
                    disabled={loading}
                />
                {formik.touched.login_email && formik.errors.login_email ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                        <p className={'font-bold'}>{formik.errors.login_email}</p>
                    </div>
                ) : null}
            </div>
            <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                    id="login_password"
                    type="password"
                    name={'login_password'}
                    placeholder="Contraseña"
                    className={
                        formik.touched.login_password && formik.errors.login_password
                            ? 'form-control is-invalid'
                            : 'form-control '
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.login_password}
                    disabled={loading}
                />
                {formik.touched.login_password && formik.errors.login_password ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                        <p className={'font-bold'}>{formik.errors.login_password}</p>
                    </div>
                ) : null}
            </div>
            <div className="form-group">
                <div className="form-check">
                    <span className="form-check-input input-check">
                        <span className="input-check__body">
                            <input id="login-remember" type="checkbox" className="input-check__input" />
                            <span className="input-check__box" />
                            <Check9x7Svg className="input-check__icon" />
                        </span>
                    </span>
                    <label className="form-check-label" htmlFor="login-remember">
                        Recordarme
                    </label>
                </div>
            </div>
            <button type="submit" className={`btn btn-primary mt-2 mt-md-3 mt-lg-4 flex `} disabled={loading}>
                {loading ? <FaSpinner className={'spinner mt-1 mr-2'} /> : null}
                Iniciar Sesión
            </button>
        </form>
    );
}

export default AccountLoginForm;
