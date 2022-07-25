import mongoose from 'mongoose';

interface IAnswer extends mongoose.Document {
    introduction: string;
    features: string[];
    kinds: string[];
    conclusion: string;
}

// SCHEMA
const AnswerSchema = new mongoose.Schema<IAnswer>({
    introduction: {
        type: String,
        required: true,
    },

    features: [String],
    kinds: [String],
    conclusion: {
        type: String,
        required: true,
    },
});

interface ISolution extends mongoose.Document {
    question: string;
    answer: IAnswer;
}

interface ISubject extends mongoose.Document {
    subjectName: string;
    questionBank: Array<ISolution>;
}

const SubjectSchema = new mongoose.Schema<ISubject>({
    subjectName: { type: String, required: true },
    questionBank: [
        {
            question: { type: String, required: true },
            answer: AnswerSchema,
        },
    ],
});

export interface ISemester extends mongoose.Document {
    semester: string;
    subjectData: ISubject;
}
const SemesterSchema = new mongoose.Schema<ISemester>({
    semester: {
        type: String,
        required: true,
    },
    subjectData: SubjectSchema,
});

export interface Falana {
    semseter: string;
    subjectData: {
        [key: string]: string;
        [key: string]: Array[ISolution];
    };
}

const semesterData = mongoose.model<ISemester>('SemesterData', SemesterSchema);

export default semesterData;
