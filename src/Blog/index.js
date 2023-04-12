import React, { useState } from "react";
import "./index.css"

const BlogForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        coverImage: null,
        content: "",
        authorName: "",
        seoDescription: ""
    });

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "coverImage" && files.length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                coverImage: files[0]
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, coverImage, content, authorName, seoDescription } = formData;
        if (title.trim().length === 0 || title.length > 50) {
            alert("Title should be between 1 to 50 characters");
            return;
        }
        if (!coverImage || (coverImage.type !== "image/png" && coverImage.type !== "image/jpeg")) {
            alert("Please upload a valid cover image (PNG or JPEG only)");
            return;
        }
        if (content.trim().length === 0) {
            alert("Please enter some content for the blog");
            return;
        }
        if (authorName.trim().length === 0 || authorName.length > 20) {
            alert("Author name should be between 1 to 20 characters");
            return;
        }
        if (seoDescription.trim().length === 0 || seoDescription.length > 200) {
            alert("SEO description should be between 1 to 200 characters");
            return;
        }
        localStorage.setItem("blogFormData", JSON.stringify(formData));
        alert("Blog created successfully!");
        setFormData({
            title: "",
            coverImage: null,
            content: "",
            authorName: "",
            seoDescription: ""
        })
        document.getElementById("coverImage").value = "";
    };


    return (
        <div className="container blog ">
            <h1 className="text-center title">Create Blog</h1>
            <div className="row">
                <div className="">
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 ">
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cover-image">Cover Image:</label>
                            <input
                                type="file"
                                name="coverImage"
                                id="coverImage"
                                accept=".png,.jpeg,.jpg"
                                onChange={handleInputChange}
                                className="form-control-file form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author-name">Author Name:</label>
                            <input
                                type="text"
                                name="authorName"
                                value={formData.authorName}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="seo-description">SEO Description:</label>
                            <textarea
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group text-center mt-3">
                            <button type="submit" className="btn btn-primary">Create Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BlogForm;
