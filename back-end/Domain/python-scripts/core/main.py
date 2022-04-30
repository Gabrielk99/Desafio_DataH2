from pca import PCA
import numpy as np
import sys
from ast import literal_eval
from pathlib import Path
import pandas as pd
import json 

def formatData(x):
    return format(x,".4f")

def replaceToDot(x):
    if type(x) == str:
        return x.replace(',','.')
    else:
        return x

def floatData(x):
    return float(x)

def main(args):
    
    df = pd.read_csv("../../../Data/uploads/input.csv")

    float_data_vectorize = np.vectorize(floatData)
    replace_vectorize = np.vectorize(replaceToDot)    
    input = df.values
    input = replace_vectorize(input)
    input = float_data_vectorize(input)
    
    pca = PCA(input,2,True)

    Path("../../../Data/processed").mkdir(parents=True,exist_ok=True)

    vectorize_format = np.vectorize(formatData)
    


    list_count_values= {}
    for column in df.columns:
        count_values = df.groupby(f'{column}').count()
        values = float_data_vectorize(replace_vectorize(count_values.index.tolist()))
        count = count_values.values[:,0]
        values_count = [{"value":value,"count":int(freq) } for value,freq in list(zip(values,count))]
        list_count_values[column] = values_count

    print(list_count_values)

    json_file = {
        "corr": vectorize_format(pca.corr_matrix).tolist(),
        "cum_var_exp" : pca.cum_var_exp.tolist(),
        "var_exp":pca.var_exp,
        "new_input" : {"x":vectorize_format(pca.get_reduced_input()[:,0]).tolist(),"y":vectorize_format(pca.get_reduced_input()[:,1]).tolist()},
        "props":df.columns.tolist(),
        "distribution":list_count_values
    }
    
    file = open("../../../Data/processed/output.json",'w')
    json.dump(json_file,file,indent=4)


if __name__ == "__main__":
    main(sys.argv)
