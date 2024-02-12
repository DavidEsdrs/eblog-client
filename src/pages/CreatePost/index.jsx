import styled from "styled-components";
import { Header } from "../../components/Header";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

const Container = styled.div`
    width: 100%;
    margin-bottom: 100px;

    main {
        margin: 0 auto;
        width: 40%;
    }
`;

const TitleInput = styled.input`
    padding: 10px 15px;
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.margins.input_margin};
    border: 1px solid #7a7a7a;
    border-radius: 5px;
    width: 100%;
`;

const SummaryInput = styled.input`
    padding: 10px 15px;
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.margins.input_margin};
    border: 1px solid #7a7a7a;
    border-radius: 5px;
    width: 100%;
`;

const H2 = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 5px;
`;

const H1 = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 5px;
`;

const FileInputContainer = styled.div`
    width: 100%;
`;

const FileLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c9c9c9;
    width: 100%;
    padding: 5px;
    border: 1px dashed black;
    border-radius: 5px;
    aspect-ratio: 4/1.9;
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.margins.input_margin};
`;

const FileInput = styled.input`
    display: none;
`;

const Form = styled.form`
`;

const SubmitButton = styled.button`
    padding: 16px 20px;
`;

const Editor = styled(ReactQuill)`
    color: black;
`;

export function CreatePost() {
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);

    const handleDrop = e => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    }

    const handleInputFile = e => {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const imageHandler = () => {
        console.log("Image added!")
    }

    const modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [
                {
                    "color": [
                        "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
                    ] 
                }
            ],
        ]
      };

    return (
        <Container>
            <Header />
            <main>
                <header>
                    <H1>
                        Create a new blog post
                    </H1>
                </header>
                <FileInputContainer 
                    onDrop={e => {
                        e.preventDefault()
                        handleDrop(e); 
                    }}
                >
                    <FileLabel>
                        <span>
                            Choose the featured Image for the post
                        </span>
                        <FileInput 
                            type="file" 
                            accept="audio/*" 
                            name="file input" 
                            onChange={e => {
                                handleInputFile(e); 
                            }} />
                    </FileLabel>
                </FileInputContainer>
                <label>
                    <H2>
                        Title
                    </H2>
                    <TitleInput type="text" placeholder="Title" />
                </label>
                <label>
                    <H2>
                        Summary
                    </H2>
                </label>
                <SummaryInput type="text" placeholder="Summary" />
                <Editor 
                    theme="snow" 
                    value={content} 
                    onChange={(e) => {console.log(e); setContent(e);}}
                    modules={{
                        toolbar: [
                            [{ size: ["small", false, "large", "huge"] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                                { align: [] }
                            ],
                            [
                                {
                                    "color": [
                                        "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"
                                    ] 
                                }
                            ]
                        ]
                    }}
                    placeholder="Content goes here..."
                    formats={["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video", "color"]}
                />
                
                <Form onSubmit={handleSubmit}>
                    <SubmitButton>
                        SEND TO REVIEW
                    </SubmitButton>
                </Form>
            </main>
        </Container>
    )
}