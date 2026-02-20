'use client'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Noto Sans JP',
  src: '/fonts/NotoSansJP-Regular.ttf'
})

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    fontSize: 12, 
    fontFamily: 'Noto Sans JP'
  },
  header: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    paddingBottom: 10
  },
  section: { marginBottom: 20 },
  label: { fontSize: 10, color: '#666' },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE', 
    paddingVertical: 8 
  },
  totalSection: { 
    marginTop: 30, 
    padding: 10, 
    backgroundColor: '#F9FAFB' 
  },
  totalLabel: { fontSize: 14, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#2563EB' }
})

export const InvoicePDF = ({ project, amount, tax, withholding, total, dueDate, profile }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>請求書 (INVOICE)</Text>
      <View style={{ textAlign: 'right', fontSize: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{profile?.full_name}</Text>
        <Text>{profile?.address}</Text>
        <Text>登録番号: {profile?.tax_registration_number}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>宛先</Text>
        <Text style={{ fontSize: 16 }}>{project.client_name} 御中</Text>
      </View>

      <View style={styles.section}>
        <Text>案件名: {project.name}</Text>
        <Text>お支払い期限: {dueDate || 'ご相談'}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={styles.row}>
          <Text>項目</Text>
          <Text>金額</Text>
        </View>
        <View style={styles.row}>
          <Text>業務報酬 (税抜小計)</Text>
          <Text>¥{amount.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text>消費税 (10%)</Text>
          <Text>¥{tax.toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text>源泉徴収税額 (10.21%)</Text>
          <Text>-¥{withholding.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.totalSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.totalLabel}>差引ご請求金額</Text>
          <Text style={styles.totalAmount}>¥{total.toLocaleString()}</Text>
        </View>
      </View>

      <View style={{ marginTop: 50, fontSize: 10, color: '#666' }}>
        <Text>※本請求書は「tasukal」で生成されました。</Text>
        <Text>※振込手数料は貴社にてご負担願います。</Text>
      </View>

      <View style={{ marginTop: 20, padding: 10, borderWidth: 1, borderStyle: 'solid', borderColor: '#EEE' }}>
        <Text style={{ fontSize: 10, color: '#666' }}>お振込先:</Text>
        <Text>{profile?.bank_info}</Text>
      </View>
    </Page>
  </Document>
)