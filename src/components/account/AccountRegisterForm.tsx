import React from "react";

function AccountRegisterForm({formik}: any) {
    return (
        <form className={'col-lg-12'} onSubmit={formik.handleSubmit}>
            <div className={'row'}>
                <div className="form-group col-lg-6">
                    <label htmlFor="register-email">Nombre</label>
                    <input
                        id="first_name"
                        name='first_name'
                        type="text"
                        placeholder="Ingrese el Nombre"
                        className={formik.touched.first_name && formik.errors.first_name ? 'form-control is-invalid' : 'form-control '}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                            <p className={'font-bold'}>{formik.errors.first_name}</p>
                        </div>
                    ) : null}
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="register-password">Apellido</label>
                    <input
                        id="last_name"
                        name='last_name'
                        type="text"
                        placeholder="Ingrese su Apellido"
                        className={formik.touched.last_name && formik.errors.last_name ? 'form-control is-invalid' : 'form-control '}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                            <p className={'font-bold'}>{formik.errors.last_name}</p>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className={'row'}>
                <div className="form-group col-lg-6">
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="email"
                        name='email'
                        type="email"
                        placeholder="Ingrese el Email"
                        className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control '}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                            <p className={'font-bold'}>{formik.errors.email}</p>
                        </div>
                    ) : null}
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="register-password">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Ingrese su Username"
                        className={formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control '}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                            <p className={'font-bold'}>{formik.errors.username}</p>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className={'row'}>
                <div className="form-group col-lg-6">
                    <label htmlFor="register-password">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"

                        placeholder="Contraseña"
                        className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control '}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                            <p className={'font-bold'}>{formik.errors.password}</p>
                        </div>
                    ) : null}
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="register-confirm">Repita la Contraseña</label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder="Contraseña"
                        className={formik.touched.password_confirmation && formik.errors.password_confirmation ? 'form-control is-invalid' : 'form-control '}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password_confirmation}
                    />
                    {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                            <p className={'font-bold'}>{formik.errors.password_confirmation}</p>
                        </div>
                    ) : null}
                </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                Registrar
            </button>
        </form>
    )
}

export default AccountRegisterForm
