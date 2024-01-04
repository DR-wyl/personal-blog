<script setup>
// 传值说明:
const props = defineProps({
    data: {
        default: {
            // ExcelFileName 必传 为导出的文件名
            ExcelFileName: 'Excel表格',
            // sheet1 表示表名可替换为任意值
            // 数据为二维数组
            sheet1: [
                ['用户名', '姓名', '年龄', '性别', '电话', '邮箱', '部门'],
                ['abc', '张三', 18, '男', '13892839188', 'awuiu@qq.com', '销售部'],
                ['abc', '李四', 20, '女', '13892839188', 'awuiu@qq.com', '技术部'],
            ],
            // sheet2 表示表名可替换为任意值
            sheet2: [
                ['用户名', '姓名', '年龄', '性别', '电话', '邮箱', '部门'],
                ['abc', '张三', 18, '男', '13892839188', 'awuiu@qq.com', '销售部'],
                ['abc', '张三', 18, '男', '13892839188', 'awuiu@qq.com', '销售部'],
                ['abc', '张三', 18, '男', '13892839188', 'awuiu@qq.com', '销售部'],
                ['abc', '张三', 18, '男', '13892839188', 'awuiu@qq.com', '销售部'],
                ['abc', '张三', 18, '男', '13892839188', 'awuiu@qq.com', '销售部'],
            ]
            // 可继续添加其他表
        }
    },
    fileType:{
        // 文件后缀可改，但不建议修改
        default: 'xlsx'
    }
});

async function downExcel() {
    try {
        const ExcelData = props.data;
        const XLSX = await import('xlsx');
        // 类似创建excel文件实例
        const workbook = XLSX.utils.book_new();
        // 遍历props传值过来的data数据
        for (let sheetName in ExcelData) {
            if (sheetName == 'ExcelFileName') continue;
            // 将data数据中的每个表转换成excel表格中的对应表实例
            const worksheet = XLSX.utils.aoa_to_sheet(ExcelData[sheetName]);
            // 将表实例添加到excel文件实例中
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }
        // 导出excel文件
        XLSX.writeFile(workbook, `${ExcelData.ExcelFileName}.${props.fileType}`);
    } catch (e) {
        console.error('请检查ExeclDown');
        console.error(e);
    }
}
</script>

<template>
    <button class="excel-down-button" @click="downExcel">
        <slot name="default">
            Excel下载
        </slot>
    </button>
</template>

<style lang="scss" scoped>
.excel-down-button{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12.5px;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
    background-color: rgb(255,255,255);
    &:hover{
        background-color: rgb(237,245,254);
    }
}
</style>