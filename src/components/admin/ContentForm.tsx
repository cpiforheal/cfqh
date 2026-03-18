import { Button, Input, Text, Textarea, View } from '@tarojs/components';
import { ui } from '../../styles/ui';

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function getValueAtPath(source, path) {
  return path.reduce((current, key) => (current == null ? undefined : current[key]), source);
}

function updateAtPath(source, path, updater) {
  if (!path.length) {
    return updater(source);
  }

  const [head, ...rest] = path;
  const isIndex = typeof head === 'number';
  const current =
    source == null
      ? isIndex
        ? []
        : {}
      : source;
  const next = Array.isArray(current) ? [...current] : { ...current };
  next[head] = updateAtPath(next[head], rest, updater);
  return next;
}

function replaceAtPath(source, path, nextValue) {
  return updateAtPath(source, path, () => nextValue);
}

function removeArrayItem(source, path, index) {
  return updateAtPath(source, path, (current) => {
    const next = Array.isArray(current) ? [...current] : [];
    next.splice(index, 1);
    return next;
  });
}

function appendArrayItem(source, path, item) {
  return updateAtPath(source, path, (current) => {
    const next = Array.isArray(current) ? [...current] : [];
    next.push(cloneValue(item));
    return next;
  });
}

function FieldShell(props) {
  return (
    <View style={{ marginBottom: props.last ? '0' : '18rpx' }}>
      <Text
        style={{
          display: 'block',
          fontSize: ui.type.meta,
          color: ui.colors.textSubtle,
          fontWeight: 700,
          marginBottom: '10rpx'
        }}
      >
        {props.label}
        {props.required ? <Text style={{ color: '#dc2626' }}> *</Text> : null}
      </Text>
      {props.children}
    </View>
  );
}

function inputStyle(minHeight = '88rpx') {
  return {
    width: '100%',
    minHeight,
    backgroundColor: '#f8fafc',
    borderRadius: '22rpx',
    border: '1rpx solid rgba(226,232,240,0.95)',
    padding: '20rpx 22rpx',
    boxSizing: 'border-box',
    fontSize: ui.type.body,
    color: ui.colors.text,
    lineHeight: 1.7
  };
}

function OptionPills(props) {
  return (
    <View style={{ display: 'flex', flexWrap: 'wrap' }}>
      {(props.options || []).map((option) => {
        const active = props.value === option.value;
        return (
          <View
            key={option.value}
            onClick={() => props.onChange(option.value)}
            style={{
              marginRight: '12rpx',
              marginBottom: '12rpx',
              padding: '14rpx 20rpx',
              borderRadius: ui.radius.pill,
              backgroundColor: active ? ui.colors.text : '#eef2f7',
              border: active ? 'none' : '1rpx solid rgba(226,232,240,0.9)'
            }}
          >
            <Text style={{ fontSize: ui.type.meta, color: active ? '#ffffff' : ui.colors.textSubtle, fontWeight: 700 }}>
              {option.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function renderField(field, path, formData, setFormData, depth = 0) {
  const fieldPath = [...path, field.key];
  const value = getValueAtPath(formData, fieldPath);

  if (field.type === 'object') {
    return (
      <View
        key={fieldPath.join('.')}
        style={{
          marginBottom: '18rpx',
          padding: '22rpx',
          borderRadius: ui.radius.md,
          backgroundColor: depth > 0 ? '#ffffff' : '#f8fafc',
          border: '1rpx solid rgba(226,232,240,0.9)'
        }}
      >
        <Text
          style={{
            display: 'block',
            fontSize: ui.type.cardTitle,
            color: ui.colors.text,
            fontWeight: 800,
            marginBottom: '16rpx'
          }}
        >
          {field.label}
        </Text>
        {(field.fields || []).map((child, index) =>
          renderField(child, fieldPath, formData, setFormData, depth + 1, index === field.fields.length - 1)
        )}
      </View>
    );
  }

  if (field.type === 'objectArray') {
    const items = Array.isArray(value) ? value : [];
    const visibleCount = typeof field.visibleItems === 'number' ? field.visibleItems : items.length;
    const visibleItems = items.slice(0, visibleCount);
    const canAppend = typeof field.maxItems !== 'number' || items.length < field.maxItems;
    return (
      <View
        key={fieldPath.join('.')}
        style={{
          marginBottom: '18rpx',
          padding: '22rpx',
          borderRadius: ui.radius.md,
          backgroundColor: '#f8fafc',
          border: '1rpx solid rgba(226,232,240,0.9)'
        }}
      >
        <Text
          style={{
            display: 'block',
            fontSize: ui.type.cardTitle,
            color: ui.colors.text,
            fontWeight: 800,
            marginBottom: '16rpx'
          }}
        >
          {field.label}
        </Text>
        {visibleItems.map((item, index) => (
          <View
            key={`${fieldPath.join('.')}.${index}`}
            style={{
              marginBottom: '16rpx',
              padding: '20rpx',
              borderRadius: ui.radius.sm,
              backgroundColor: '#ffffff',
              border: '1rpx solid rgba(226,232,240,0.9)'
            }}
          >
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14rpx' }}>
              <Text style={{ fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700 }}>
                {field.itemLabel || field.label} {index + 1}
              </Text>
              <View
                onClick={() => setFormData((current) => removeArrayItem(current, fieldPath, index))}
                style={{
                  padding: '10rpx 16rpx',
                  borderRadius: ui.radius.pill,
                  backgroundColor: '#fff1f2'
                }}
              >
                <Text style={{ fontSize: ui.type.note, color: '#be123c', fontWeight: 700 }}>删除</Text>
              </View>
            </View>
            {(field.fields || []).map((child) => renderField(child, [...fieldPath, index], formData, setFormData, depth + 1))}
          </View>
        ))}
        {canAppend ? (
          <Button
            onClick={() => setFormData((current) => appendArrayItem(current, fieldPath, field.defaultItem || {}))}
            style={{ marginTop: visibleItems.length ? '6rpx' : '0' }}
          >
            新增{field.itemLabel || field.label}
          </Button>
        ) : null}
      </View>
    );
  }

  if (field.type === 'stringArray') {
    const items = Array.isArray(value) ? value : [];
    return (
      <FieldShell key={fieldPath.join('.')} label={field.label} required={field.required}>
        {(items.length ? items : ['']).map((item, index) => (
          <View key={`${fieldPath.join('.')}.${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '12rpx' }}>
            <Input
              value={String(item || '')}
              onInput={(event) =>
                setFormData((current) =>
                  updateAtPath(current, fieldPath, (currentItems) => {
                    const next = Array.isArray(currentItems) ? [...currentItems] : [];
                    next[index] = event.detail.value;
                    return next;
                  })
                )
              }
              style={{ ...inputStyle(), flex: 1, minHeight: '80rpx' }}
            />
            <View
              onClick={() => setFormData((current) => removeArrayItem(current, fieldPath, index))}
              style={{
                marginLeft: '12rpx',
                padding: '14rpx 18rpx',
                borderRadius: ui.radius.pill,
                backgroundColor: '#fff1f2'
              }}
            >
              <Text style={{ fontSize: ui.type.note, color: '#be123c', fontWeight: 700 }}>删</Text>
            </View>
          </View>
        ))}
        <Button onClick={() => setFormData((current) => appendArrayItem(current, fieldPath, field.defaultItem || ''))}>新增一项</Button>
      </FieldShell>
    );
  }

  if (field.type === 'textarea') {
    return (
      <FieldShell key={fieldPath.join('.')} label={field.label} required={field.required}>
        <Textarea
          value={value == null ? '' : String(value)}
          maxlength={-1}
          onInput={(event) => setFormData((current) => replaceAtPath(current, fieldPath, event.detail.value))}
          style={inputStyle(field.minHeight || '180rpx')}
        />
      </FieldShell>
    );
  }

  if (field.type === 'number') {
    return (
      <FieldShell key={fieldPath.join('.')} label={field.label} required={field.required}>
        <Input
          type="number"
          value={value == null ? '' : String(value)}
          onInput={(event) => {
            const raw = event.detail.value;
            setFormData((current) => replaceAtPath(current, fieldPath, raw === '' ? '' : Number(raw)));
          }}
          style={inputStyle()}
        />
      </FieldShell>
    );
  }

  if (field.type === 'boolean') {
    return (
      <FieldShell key={fieldPath.join('.')} label={field.label} required={field.required}>
        <OptionPills
          value={!!value}
          options={[
            { label: '是', value: true },
            { label: '否', value: false }
          ]}
          onChange={(nextValue) => setFormData((current) => replaceAtPath(current, fieldPath, nextValue))}
        />
      </FieldShell>
    );
  }

  if (field.type === 'select') {
    return (
      <FieldShell key={fieldPath.join('.')} label={field.label} required={field.required}>
        <OptionPills value={value} options={field.options || []} onChange={(nextValue) => setFormData((current) => replaceAtPath(current, fieldPath, nextValue))} />
      </FieldShell>
    );
  }

  return (
    <FieldShell key={fieldPath.join('.')} label={field.label} required={field.required}>
      <Input
        value={value == null ? '' : String(value)}
        onInput={(event) => setFormData((current) => replaceAtPath(current, fieldPath, event.detail.value))}
        style={inputStyle()}
      />
    </FieldShell>
  );
}

export default function ContentForm(props) {
  return (
    <View>
      {(props.schema || []).map((field) => renderField(field, [], props.value || {}, props.onChange))}
    </View>
  );
}
