import React from "react";

function FormProfile({formik}: any) {
    return (
        <form className="col-12 col-lg-7 col-xl-6" onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="first_name">Nombre</label>
                <input
                    id="first_name"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    name={'first_name'}
                    className={formik.touched.first_name && formik.errors.first_name ? 'form-control is-invalid' : 'form-control '}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                />
            </div>
            {formik.touched.first_name && formik.errors.first_name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.first_name}</p>
                </div>
            ) : null}
            <div className="form-group">
                <label htmlFor="last_name">Apellido</label>
                <input
                    id="last_name"
                    type="text"
                    placeholder="Ingresa tu apellido"
                    name={'last_name'}
                    className={formik.touched.last_name && formik.errors.last_name ? 'form-control is-invalid' : 'form-control '}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                />
            </div>
            {formik.touched.last_name && formik.errors.last_name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.last_name}</p>
                </div>
            ) : null}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Ingresa tu email"
                    name={'email'}
                    className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control '}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
            </div>
            {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.email}</p>
                </div>
            ) : null}
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Ingresa username"
                    name={'username'}
                    className={formik.touched.username && formik.errors.username ? 'form-control is-invalid' : 'form-control '}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
            </div>
            {formik.touched.username && formik.errors.username ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.username}</p>
                </div>
            ) : null}
            <div className="form-group">
                <label htmlFor="phone_number">Número de Teléfono</label>
                <input
                    id="phone_number"
                    type="number"
                    placeholder="Ingresa tu número de teléfono"
                    name={'phone_number'}
                    className={formik.touched.phone_number && formik.errors.phone_number ? 'form-control is-invalid' : 'form-control '}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone_number}
                />
            </div>
            {formik.touched.phone_number && formik.errors.phone_number ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
                    <p className={'font-bold'}>{formik.errors.phone_number}</p>
                </div>
            ) : null}

            <div className="form-group mt-5 mb-0">
                <button type="button" className="btn btn-primary">Guardar</button>
            </div>
        </form>
    )

}

export default FormProfile;
